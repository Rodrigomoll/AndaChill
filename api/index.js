import axios from "axios"

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const {data : {data}} = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
            params: {
            bl_latitude: bl_lat ? bl_lat : '-16.43283332057123',
            tr_latitude: tr_lat ? tr_lat : '-16.37527144284026',
            bl_longitude: bl_lng ? bl_lng : '-71.56468061966909',
            tr_longitude: tr_lng ? tr_lng : '-71.51334233857216',
            restaurant_tagcategory_standalone: '10591',
            restaurant_tagcategory: '10591',
            limit: '30',
            currency: 'USD',
            open_now: 'false',
            lunit: 'km',
            lang: 'en_US'
        },
        headers: {
            'X-RapidAPI-Key': '406b0e6fadmsh506ed80d84c357ep13382ajsnfe50b0ee69e7',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          },
        }
        );

        return data;
    } catch (error) {
        return null
    }
}