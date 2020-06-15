using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using MyAccounts.Application.Accounts;
using MyAccounts.ViewModels;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MyAccounts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly ILogger<AccountsController> logger;
        private readonly IAccountService service;

        public AccountsController(ILogger<AccountsController> logger,
            IAccountService service)
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
                return Ok(new ResponceViewModel<IEnumerable<AccountViewModel>>(await service.GetAll()));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in get all accounts: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Get accounts failed. {ex.Message}"));
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public IActionResult GetById(int id)
        {
            try
            {
                var account = service.GetById(id);
                if (account == null)
                    return NotFound(new ResponceViewModel<string>($"Account {id} not found"));
                return Ok(new ResponceViewModel<AccountViewModel>(account));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in Get by Id {id} account: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Get account by id failed {ex.Message}"));
            }
        }

        [HttpPost("")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult Add([FromBody]AccountViewModel model)
        {
            try
            {
                var acc = service.AddAccount(model);
                return CreatedAtAction(nameof(GetById), new { id = acc.Id }, ResponceViewModel<AccountViewModel>.GenerateRepsonce(acc));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in add account: {ex}");
                return BadRequest(ResponceViewModel<string>.GenerateError($"Error in add account:{ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult Update(int id, [FromBody]AccountViewModel model)
        {
            try
            {
                service.UpdateAccount(model);
                return Ok(ResponceViewModel<string>.GenerateRepsonce("Update succeed."));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in Update account: {ex}");
                return BadRequest(ResponceViewModel<string>.GenerateError($"Error in update account:{ex.Message}"));
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult Delete(int id)
        {
            try
            {
                service.DeleteAccount(id);
                return Ok(ResponceViewModel<string>.GenerateRepsonce("Delete succeed."));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in delete account: {ex}");
                return BadRequest(ResponceViewModel<string>.GenerateError($"Error in delete account: {ex.Message}"));
            }
        }
    }
}
