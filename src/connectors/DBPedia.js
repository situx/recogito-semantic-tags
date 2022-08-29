export default class DBPediaSource {

  // Configuration parameters provided 
  // to the widget during initialization
  constructor(widgetConfig) {
    this.name = widgetConfig?.name || 'DBPediaSource'
  }

  // Query string + global widget configuration (language, etc.)
  query(query, globalConfig) {
    return fetch(`https://dbpedia.org/sparql?q=${query}`)
      .then(response => response.json())
      .then(data => data.results.map(result => {
        // Extract relevant fields and return a Tag object
        const { uri, label, description } = result;
        return { uri, label, description };
      }));
  }

}

// Entities from my datasource all start with www.mysource.org/entity
DBPediaSource.matches = tag =>
  true;

// Format as 'my:<ID>'
DBPediaSource.format = tag =>
  tag;