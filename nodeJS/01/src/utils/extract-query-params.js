export function extractQueryParams(queryParams){
  const query = queryParams.substr(1).split('&').reduce((queryParams, query) =>{
    const [key, value] = query.split('=')

    queryParams[key] = value

    return queryParams
  },{}) 

  return query
}