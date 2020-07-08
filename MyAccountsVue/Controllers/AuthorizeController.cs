using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using MyAccounts.Application.Login;
using MyAccountsVue.ViewModels;

using System;

namespace MyAccountsVue.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly ILogger<AuthorizeController> logger;
        private readonly IUserService userService;

        public AuthorizeController(ILogger<AuthorizeController> logger, IUserService userService)
        {
            this.logger = logger;
            this.userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var token = userService.Login(model);

                return Ok(new ResponceViewModel<TokenViewModel>(token));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in Login :{ex}");
                return BadRequest(new ResponceViewModel<string>($"Login failed: {ex.Message}"));
            }
        }

        [AllowAnonymous]
        [HttpPost("registrate")]
        public IActionResult Registrate([FromBody]RegistrateViewModel model)
        {
            try
            {
                var token = userService.Registrate(model);
                return Ok(new ResponceViewModel<TokenViewModel>(token));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown in Authorize registrate: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Registrate failed:{ex.Message}"));

            }
        }

        [HttpGet("userInfo")]
        public IActionResult userInfo()
        {
            try
            {
                var userName = User.Identity.Name;
                var user = userService.GetUserInfoByName(userName);
                return Ok(new ResponceViewModel<UserViewModel>(user));
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception thrown on Get user info by token: {ex}");
                return BadRequest(new ResponceViewModel<string>($"Get user info failed. {ex.Message}"));
            }
        }
    }
}
