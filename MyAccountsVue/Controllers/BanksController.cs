using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using MyAccounts.Application.Banks;
using MyAccountsVue.ViewModels;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyAccountsVue.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BanksController : ControllerBase
    {
        private readonly ILogger<BanksController> logger;
        private readonly IBankAppService bankService;

        /// <summary>
        /// Constructor of banks controller.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="bankService"></param>
        public BanksController(ILogger<BanksController> logger, IBankAppService bankService)
        {
            this.logger = logger;
            this.bankService = bankService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType(typeof(ResponceViewModel<IEnumerable<BankViewModel>>))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(new ResponceViewModel<IEnumerable<BankViewModel>>(await bankService.GetAll()));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in get all banks: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Get banks failed. {ex.Message}"));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("")]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType(typeof(ResponceViewModel<BankViewModel>))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public IActionResult Create(BankViewModel model)
        {
            try
            {
                var bank = bankService.AddBank(model);

                return Created($"api/[controller]/{model.Id}", new ResponceViewModel<BankViewModel>(model));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in Create Bank: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Create Bank failed. {ex.Message}"));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType(typeof(ResponceViewModel<BankViewModel>))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(new ResponceViewModel<BankViewModel>(bankService.GetById(id)));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in GetBankById. {ex}");
                return BadRequest(new ResponceViewModel<string>($"Get Bank failed. {ex.Message}"));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType(typeof(ResponceViewModel<BankViewModel>))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Update(int id, [FromBody]BankViewModel model)
        {
            try
            {
                bankService.UpdateBank(model);
                return Ok(new ResponceViewModel<BankViewModel>(bankService.GetById(id)));
            }
            catch (Exception ex)
            {
                logger.LogError($"Error thrown in Update bank: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Update Bank failed. {ex.Message}"));
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Delete(int id, [FromBody]BankViewModel model)
        {
            try
            {
                bankService.RemoveBank(id, model);
                return Ok(new ResponceViewModel<string>("Bank was delete successfully!"));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in delete bank: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Delete Bank failed. {ex.Message}"));
            }
        }
    }
}
