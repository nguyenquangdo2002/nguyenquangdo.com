import moment from "moment";


export const getTransactionHistory = async (req, res) => {
    try {
        const taikhoanmb = "NGUYENQUANGDODMX2002";
        const deviceIdCommon = "6zfiq2kk-mbib-0000-0000-2025072415301226";
        const sessionID = "4c60c492-731a-4fb9-86ab-b30f06dae9a2";
        const sotaikhoanmb = "0925709729";
        const dataNow = moment().tz("Asia/Ho_Chi_Minh");
        const time1 = dataNow.format("YYYYMMDDHHmmss");
        const time2 = dataNow.add(60 * 6 * 24 * 1, 'seconds').format("YYYYMMDDHHmmss");
        const url = "https://online.mbbank.com.vn/retail_web/common/getTransactionHistory";

        const data = {
            accountNo: sotaikhoanmb,
            deviceIdCommon,
            fromDate: time1,
            historyNumber: "",
            historyType: "DATE_RANGE",
            refNo: taikhoanmb + time2,
            sessionID,
            toDate: time2,
            type: "ACCOUNT"
        };

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
                'Referer': 'https://online.mbbank.com.vn/information-account/source-account',
                'Origin': 'https://online.mbbank.com.vn',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        });

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}