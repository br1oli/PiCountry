
const initialState = {
    countries : [],
    TodosCountries : [],
    Activities: [],
    ActivitiesCountry: [],
    countryD: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES': 
            return{
                ...state,
                countries: action.payload,
                TodosCountries: action.payload,
                ActivitiesCountry: action.payload
            }
        case "GET_NAME_COUNTRIES":
                return {
                    ...state,
                    countries: action.payload
                }
        case 'FILTER_CONTINENT':
                const allCountries = state.TodosCountries
                const continentFilter = action.payload === 'All' ? allCountries : allCountries.filter(e => e.continente === action.payload)
                return {
                    ...state,
                    countries: continentFilter
                }
        case "GET_ACTIVITIES":
            return {
                ...state,
                Activities: action.payload
            }
        case "POST_ACTIVITIES":
            return {
                ...state,
            }
            case 'FILTER_ACTIVITIES': {
                const todos = state.ActivitiesCountry
                    const filtroActivity = action.payload === 'all' ? todos : todos.filter(d => d.Actividads.find((e) => e.name.toLowerCase() === action.payload.toLowerCase()))
                    console.log('FiltroACTIVITY', filtroActivity)
                return{
                    ...state,
                    countries : action.payload === 'all' ? todos : filtroActivity
                };
            }
        case 'ASC_DESC':
            let sortedArr = action.payload === 'asc' ?
            state.countries.sort(function(a, b){
                if(a.población > b.población){
                    return 1;
                }
                if(b.población > a.población){
                    return -1;
                }
                return 0
            }) :  state.countries.sort(function(a,b){
                if(a.población > b.población){
                    return -1;
                }
                if(b.población > a.población){
                    return 1
                }
                return 0;
            })
            // console.log(state.countries.map(e=>e.población), "COUNTRIES")
            return {
                ...state,
                countries: sortedArr
            }
        case 'ALFABETICO':
            const allCountries3 = state.TodosCountries;
            // .sort((a,b) => a.name.localeCompare(b.name))
            const ordenAlfabetico = allCountries3.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                return 0;
            })
            return {
                ...state,
                countries: action.payload === "az" ? ordenAlfabetico : ordenAlfabetico.reverse()
            }

        case 'GET_DETAIL':
            const data = action.payload

            return {
                ...state,
                countryD: data
            }
        default:
            return state;
    }

}


export default rootReducer;