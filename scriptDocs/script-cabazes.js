const SHEET_CSV_URL_CABAZES = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTt94zo_YFY4pz2ILaVDJDmQ_iIeD0XdSC3sASqse1a_tyIAUca2Q5Kr2yIgIqB8SJ3_zr0iCJdm1tc/pub?gid=555614884&single=true&output=csv';

function parseCSVRow(row) {
    const cols = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            cols.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    cols.push(current.trim());
    return cols;
}

export async function fetchCabazesSheetData() {
    const CACHE_KEY      = 'sheetsCache_cabazes';
    const CACHE_DATE_KEY = 'sheetsCacheDate_cabazes';
    const cached     = localStorage.getItem(CACHE_KEY);
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);

    function getLastScheduledTime() {
        const now = new Date();
        const hours = [8, 12, 17];
        const todaySlots = hours.map(h => {
            const d = new Date(now);
            d.setHours(h, 0, 0, 0);
            return d.getTime();
        });
        const pastSlots = todaySlots.filter(t => t <= Date.now());
        if (pastSlots.length > 0) return Math.max(...pastSlots);
        const yesterday17 = new Date(now);
        yesterday17.setDate(now.getDate() - 1);
        yesterday17.setHours(17, 0, 0, 0);
        return yesterday17.getTime();
    }

    if (cached && cachedDate && parseInt(cachedDate) >= getLastScheduledTime()) {
        console.log('A usar cache do Sheets (cabazes)');
        return JSON.parse(cached);
    }

    try {
        console.log('A fazer fetch ao Sheets (cabazes)...');
        const text  = await (await fetch(`${SHEET_CSV_URL_CABAZES}&t=${Date.now()}`)).text();
        const map   = {};
        const lines = text.trim().split('\n').slice(1);

        for (const row of lines) {
            const cols = parseCSVRow(row);
            const id   = cols[0]?.trim();

            if (!['1', '2', '3', '5'].includes(id)) continue;

            const preco = parseFloat(cols[2]?.trim());

            // junta as 4 colunas de conteúdo e faz split por vírgula
            const content = [cols[3], cols[4], cols[5], cols[6]]
                .filter(c => c && c.trim() !== '')
                .join(',')
                .split(',')
                .map(s => s.trim())
                .filter(s => s !== '');

            map[id] = { preco, content: content.length > 0 ? content : null };
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(map));
        localStorage.setItem(CACHE_DATE_KEY, Date.now().toString());
        return map;
    } catch (e) {
        console.error('Erro Sheets (cabazes):', e);
        return cached ? JSON.parse(cached) : {};
    }
}

export function getCabazContent(sheetsData, fallbackItems) {
    const fullContent = sheetsData['5']?.content ?? fallbackItems;
    return {
        pequeno: fullContent.slice(0, 5),
        medio:   fullContent.slice(0, 10),
        grande:  fullContent.slice(0, 14),
        premium: fullContent
    };
}