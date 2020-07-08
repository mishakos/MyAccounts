using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using MyAccounts.Application.Currencies;
using MyAccountsVue.ViewModels;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MyAccountsVue.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CurrenciesController : ControllerBase
    {
        private readonly ILogger<CurrenciesController> logger;
        private readonly ICurrencyAppService service;

        public CurrenciesController(ILogger<CurrenciesController> logger, ICurrencyAppService service)
        {
            this.logger = logger;
            this.service = service;
        }

        [HttpGet("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(new ResponceViewModel<IEnumerable<CurrencyViewModel>>(await service.GetCurrencies()));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in get all currencies: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Get currencies failed: {ex.Message}"));
            }
        }

        [HttpGet("{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult GetByCode(string code)
        {
            try
            {
                return Ok(new ResponceViewModel<CurrencyViewModel>(service.GetCurrency(code)));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in get currency by code {code}: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Get currency by code {code} failed: {ex.Message}"));
            }
        }

        [HttpGet("{id}/rates")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult GetCurrencyRates(int id)
        {
            try
            {
                return Ok(ResponceViewModel<IEnumerable<CurrencyRateViewModel>>.GenerateRepsonce(service.GetRatesByCurrency(id)));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in get currency rate by id {id}: {ex}");
                return BadRequest(ResponceViewModel<string>.GenerateError($"Get currency rate by id {id} failed: {ex.Message}"));
            }
        }

        [HttpPost("")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult AddCurrency([FromBody] CurrencyViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                service.AddCurrency(model);
                return Created($"api/[controller]/{model.Code}", new ResponceViewModel<CurrencyViewModel>(model));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in add currency {model.Id}: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Add currency {model.Id} failed. {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult UpdateCurrency(int id, [FromBody]CurrencyViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                service.UpdateCurrency(model);
                return Ok(new ResponceViewModel<CurrencyViewModel>(model));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in update currency {model.Id}: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Update currency {model.Id} failed. {ex.Message}"));
            }
        }

        [HttpPost("{id}/rates")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult AddRate(int id, [FromBody]CurrencyRateViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                service.AddRate(model);
                return Ok(new ResponceViewModel<string>($"Rate is created successfully") { HasError = false });
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown on add currency rate: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Add currency rate failed. {ex.Message}"));
            }
        }

        [HttpPost("{id}/rates/import")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> ImportRates(int id, [FromBody]LoadRatesViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var rates = await service.ImportRatesAsync(id, model.fromDate, model.toDate);
                return Ok(new ResponceViewModel<IEnumerable<CurrencyRateViewModel>>(rates));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown on import rates: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Import error: {ex.Message}"));
            }
        }
    }
}
