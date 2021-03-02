export const Service = {
    get: async (url, headersParam='') => {
        let response;
        if (headersParam !== '') {
            response = await fetch(url, {
                method: 'GET',
                headers: headersParam
            });

        } else {
            response = await fetch(url, {
                method: 'GET'
            });
        }

        return await response.json();
    },

    put: async (url, bodyParam, headersParam = '') => {
        let response;
        if (headersParam !== '') {
            response = await fetch(url, {
                method: 'PUT',
                body: bodyParam,
                headers: headersParam
            });

        } else {
            response = await fetch(url, {
                method: 'PUT',
                body: bodyParam
            });
        }

        return await response.json();
    }
}