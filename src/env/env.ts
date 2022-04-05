export default function () {
  const NODE_ENV = process.env.NODE_ENV;
  process.env.PORT = '8000';
  process.env.JWT_SECRET = 'BarcodePortfolioJwtSecret';
  if (NODE_ENV == 'development') {
    dev();
  } else if (NODE_ENV == 'production') {
    prod();
  } else {
    test();
  }
}

function dev() {
  process.env.DB_ADDRESS =
    'mongodb://root:e8ITIz9uzp5vincgFcHCEWAY@linda.iran.liara.ir:34231/base-shop?authSource=admin&replicaSet=rs0&readPreference=primary&appname=MongoDB%20Compass&ssl=false';
  process.env.ACCESS_KEY = '7e39c0cd-dc15-40d0-bbf7-ea8d5c256050';
  process.env.SECRET_KEY =
    '368a6850478e4ace0d0629d0a26b15eb77d189854d0499203532b41a80c2d18a';
  process.env.API_ENDPOINT = 'https://s3.ir-thr-at1.arvanstorage.com';
  process.env.BUCKET_NAME = 'base-shop';
  process.env.DOMAIN = "http://localhost:8000"
}
function prod() {
  process.env.DB_ADDRESS =
    'mongodb://root:e8ITIz9uzp5vincgFcHCEWAY@linda.iran.liara.ir:34231/base-shop?authSource=admin&replicaSet=rs0&readPreference=primary&appname=MongoDB%20Compass&ssl=false';
  process.env.ACCESS_KEY = '7e39c0cd-dc15-40d0-bbf7-ea8d5c256050';
  process.env.SECRET_KEY =
    '368a6850478e4ace0d0629d0a26b15eb77d189854d0499203532b41a80c2d18a';
  process.env.API_ENDPOINT = 'https://s3.ir-thr-at1.arvanstorage.com';
  process.env.BUCKET_NAME = 'base-shop';
}
function test() {
  process.env.DB_ADDRESS =
    'mongodb://root:e8ITIz9uzp5vincgFcHCEWAY@linda.iran.liara.ir:34231/base-shop?authSource=admin&replicaSet=rs0&readPreference=primary&appname=MongoDB%20Compass&ssl=false';
  process.env.ACCESS_KEY = '7e39c0cd-dc15-40d0-bbf7-ea8d5c256050';
  process.env.SECRET_KEY =
    '368a6850478e4ace0d0629d0a26b15eb77d189854d0499203532b41a80c2d18a';
  process.env.API_ENDPOINT = 'https://s3.ir-thr-at1.arvanstorage.com';
  process.env.BUCKET_NAME = 'base-shop';
}
