require('dotenv').config();
const ecpay_payment = require('ecpay_aio_nodejs');
const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;
const options = {
  OperationMode: 'Test', 
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [
    //    "Credit",
    //    "WebATM",
    //    "ATM",
    //    "CVS",
    //    "BARCODE",
    //    "AndroidPay"
  ],
  IsProjectContractor: false,
};
let TradeNo;


const ApiController = {
    renderpaymentPageHandler: async (req, res) => {
        const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC',
          });
          TradeNo = 'test' + new Date().getTime();
          let base_param = {
            MerchantTradeNo: TradeNo, 
            MerchantTradeDate,
            TotalAmount: '100',
            TradeDesc: '測試交易描述',
            ItemName: '測試商品等',
            ReturnURL: `${HOST}/return`,
            ClientBackURL: `${HOST}/clientReturn`,
          };
          const create = new ecpay_payment(options);
        
          const html = create.payment_client.aio_check_out_all(base_param);
        
          res.render('try', {
            title: 'Express',
            html: html,
          });
    },
    ReturnHandler: async (req, res) => {
        console.log('req.body:', req.body);

        const { CheckMacValue } = req.body;
        const data = { ...req.body };
        delete data.CheckMacValue; 

        const create = new ecpay_payment(options);
        const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

        console.log(
            '確認交易正確性：',
            CheckMacValue === checkValue,
            CheckMacValue,
            checkValue,
        );

        
        res.send('1|OK');
    },
    renderReturnPageHandler: async (req, res) => {
        console.log('clientReturn:', req.body, req.query);
        res.render("index", { pageTitle: "Checkout Page" });
    },
}

module.exports = ApiController