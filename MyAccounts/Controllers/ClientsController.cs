using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using MyAccounts.Application.Clients;
using MyAccounts.ViewModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MyAccounts.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClientsController : ControllerBase
    {
        private readonly IClientAppService appService;
        private readonly ILogger<ClientsController> logger;

        public ClientsController(IClientAppService appService, ILogger<ClientsController> logger)
        {
            this.appService = appService;
            this.logger = logger;
        }

        [HttpGet("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(ResponceViewModel<IEnumerable<ClientViewModel>>.GenerateRepsonce(await appService.GetAll()));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in get all clients: {ex}");
                return BadRequest(ResponceViewModel<string>.GenerateError($"Get all clients failed. {ex.Message}"));
            }
        }

        [HttpPost("")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ResponceViewModel<string>), StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult Create(ClientViewModel model)
        {
            try
            {
                var bank = appService.Add(model);

                return Created($"api/[controller]/{model.Id}", new ResponceViewModel<ClientViewModel>(model));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in Create client: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Create client failed. {ex.Message}"));
            }
        }
    }
}
