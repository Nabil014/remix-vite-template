export const getMapData = async (currentPage: number) => {
    try {
        const start = (currentPage - 1) * 30 + 1;
        const resp = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=100`, {
            headers: {
                'X-CMC_PRO_API_KEY': "316de030-e7c7-418b-b2d2-26e172d59119"
            },
        });
        if (!resp.ok) {
            throw new Error('Failed to fetch data');
        }
        const json = await resp.json();
        return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};

export const getInfoData = async (ids?: number[]) => {
    try {
        if (!ids || ids.length === 0)  {
            throw new Error('No IDs provided');
        }
        const idString = ids.join(',');
        const resp = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${idString}`, {
            headers: {
                'X-CMC_PRO_API_KEY': "316de030-e7c7-418b-b2d2-26e172d59119",
            },
        });

        if (!resp.ok) {
            throw new Error('Failed to fetch data');
        }

        const json = await resp.json();
        return json.data || {};
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};

export const getLatestData = async (ids?: number[]) => {
    try {
        if (!ids || ids.length === 0) {
            throw new Error('No IDs provided');
        }
        const idString = ids.join(',');
        const resp = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${idString}`, {
            headers: {
                'X-CMC_PRO_API_KEY': "316de030-e7c7-418b-b2d2-26e172d59119",
            },
        });

        if (!resp.ok) {
            throw new Error('Failed to fetch data');
        }

        const json = await resp.json();
        return json.data || {};
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};
