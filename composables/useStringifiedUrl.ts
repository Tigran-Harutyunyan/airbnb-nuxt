import qs from 'query-string';

export const useStringifiedUrl = (endPoint: string) => {

    const getUrl = () => {
        const route = useRoute();
        return qs.stringifyUrl({
            url: endPoint,
            query: route.query
        }, { skipNull: true });
    }

    return {
        getUrl
    }
}