using MyAccounts.Core.Currencies;

using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace MyAccounts.Application.Connections
{
    public class BankApiService : IBankApiService
    {
        private const string NBU_URL_API = "https://bank.gov.ua/NBUStatService/v1/";

        public async Task<CurrencyRate> LoadRate(int currencyId, string currencyCode, DateTime date)
        {
            using var client = new HttpClient
            {
                BaseAddress = new Uri($"{NBU_URL_API}")
            };
            var response = await client.GetAsync($"statdirectory/exchange?valcode={currencyCode}&date={date.ToString("yyyyMMdd")}&json");
            var result = await response.Content.ReadAsStringAsync();
            var rateResponse = JsonConvert.DeserializeObject<List<RateResponse>>(result);
            var rate = rateResponse.FirstOrDefault();
            if (rate == null)
            {
                throw new Exception("rate response is empty");
            }
            return CurrencyRate.CreateRate(currencyId, date, 1, Decimal.Parse(rate.rate, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture));
        }
    }
}