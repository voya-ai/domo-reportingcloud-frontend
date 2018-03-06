module.exports = function(environment) {
  let ENV = {};

  if(environment === 'production') {
    ENV["s3-index"] = {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
      allowOverwrite: true
    };

    ENV["s3"] = {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,eot,ttf,woff,woff2,otf,json}'
    };
  }

  if(environment === 'staging') {
    ENV["s3-index"] = {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET_STAGING,
      region: process.env.AWS_REGION,
      allowOverwrite: true
    };

    ENV["s3"] = {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET_STAGING,
      region: process.env.AWS_REGION,
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,eot,ttf,woff,woff2,otf,json}'
    };

    ENV["deployjs-angular-build"] = {
      environment: 'staging'
    }
  }

  return ENV;
};
