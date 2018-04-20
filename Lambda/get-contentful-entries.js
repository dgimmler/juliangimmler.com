const contentful = require('contentful');

const CONFIG = {
  space: '<space id>',
  accessToken: '<access token>'
}

const client = contentful.createClient({
  space: CONFIG.space,
  accessToken: CONFIG.accessToken
})

exports.handler = async (event) => {
  var responseBody = { "Reason" : "Content type not valid" };

  try{
    // return different content types if type query param provided
    var contentType = event.queryStringParameters.type.toString().toLowerCase();

    //* ENTRIES *//

    // SPLASH PHOTOS
    if(contentType === "splashphoto"){
      return client.getEntries(Object.assign({
          content_type: 'splashPhoto'
      }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }

    // RESUME ITEMS
    if(contentType === "resumeitem"){
      return client.getEntries(Object.assign({
          content_type: 'resumeItem'
      }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }

    // COPYRIGHT
    if(contentType === "copyright"){
      return client.getEntries(Object.assign({
          content_type: 'copyright'
      }))
        .then((res) => {
          responseBody = res.items[0].fields;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }

    // RESUME ITEM
    if(contentType === "resumeitem"){
      return client.getEntries(Object.assign({
          content_type: 'resumeItem'
      }, { "order" : "fields.order" }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }

    // PAPER RESUME
    if(contentType === "paperresume"){
      return client.getEntries(Object.assign({
          content_type: 'paperResume'
      }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }
    
    // BLOG POST
    if(contentType === "blogpost"){
      let page = event.queryStringParameters.page || 1;
      
      return client.getEntries(Object.assign({
          content_type: 'blogPost'
      }, { 
        'limit' : 6,
        'skip' : page,
        'order' : '-sys.updatedAt'
      }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }
    
    // BLOG POST FILTERED
    if(contentType === "blogpostfiltered"){
      let page = event.queryStringParameters.page || 1;
      let filter = event.queryStringParameters.filter;
      
      return client.getEntries(Object.assign({
          content_type: 'blogPost'
      }, { 
        "content_type" : "blogPost",
        "fields.tags[all]" : filter,
        "limit" : 6,
        "skip" : page,
        "order" : '-sys.updatedAt'
      }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }
    
    // GALLERY ITEMS
    if(contentType === "gallary"){
      let exclude = event.queryStringParameters.exclude;
      
      return client.getEntries(Object.assign({
          content_type: 'gallary'
      }, {
        'order' : '-sys.updatedAt',
        "fields.type[nin]" : exclude
      }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }
    
    // GALLERY FILTER IMAGES
    if(contentType === "galleryfilterimage"){
      return client.getEntries(Object.assign({
          content_type: 'galleryFilterImage'
      }))
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }
    
    //* SINGLE ENTRY *//
    
    // MAIN HEADER
    if(contentType === "mainheader"){
      return client.getEntry('7JGAWjesGkiKcoEa6o4mC0')
        .then((res) => {
          responseBody = res.fields;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }
    
    // ABOUT ME
    if(contentType === "aboutme"){
      return client.getEntry('3pxTiQRCTuUkCY8wKOwsCw')
        .then((res) => {
          responseBody = res.fields;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    }
    
  } catch(err){
    try{
      // return all entries if no query param provided
      return client.getEntries()
        .then((res) => {
          responseBody = res.items;

          return {
            "statusCode": 200,
            "headers": {
              "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody)
          }
        });
    } catch(e){
      // error
      responseBody = { "Reason" : e };

      return {
        "statusCode": 500,
        "headers": {
          "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(responseBody)
      };
    }
  }
};
