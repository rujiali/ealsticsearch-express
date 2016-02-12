var fs, configurationFile;

configurationFile = 'configuration.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
  host: configuration.host,
  log: 'info'
});

var indexName = configuration.index;

/**
 * Delete an existing index
 */
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}
exports.deleteIndex = deleteIndex;

/**
 * create the index
 */
function initIndex() {
  return elasticClient.indices.create({
    index: indexName
  });
}
exports.initIndex = initIndex;

/**
 * check if the index exists
 */
function indexExists() {
  return elasticClient.indices.exists({
    index: indexName
  });
}
exports.indexExists = indexExists;

/**
 * check status
 */
function status() {
  return elasticClient.cluster.state({
    metric: [
      'cluster_name',
      'nodes',
      'master_node',
      'version'
    ]
  });
}
exports.status = status;

/**
 * Search for all
 */
function matchAll(index, type) {
  return elasticClient.search({
    index: index,
    type: type,
    body: {
      query: {
        match_all: {
        }
      }
    }
  })
}
exports.matchAll = matchAll;

/**
 * Search string
 */
function searchString(index, query) {
  return elasticClient.search({
    index: index,
    q: query
  })
}
exports.searchString = searchString;

/**
 * Get mapping
 */
function getMapping(index, type) {
  return elasticClient.indices.getMapping({
    index: index,
    type: type
  })
}
exports.getMapping = getMapping;