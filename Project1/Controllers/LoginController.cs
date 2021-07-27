using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeFirstMigration.Context;
using Project1.Models;

namespace Project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public LoginController(EmployeeDbContext context)
        {
            _context = context;
        }

        // GET: api/Login
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoginDetails>>> GetLoginDetails()
        {
            return await _context.LoginDetails.ToListAsync();
        }

        // GET: api/Login/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoginDetails>> GetLoginDetails(int id)
        {
            var loginDetails = await _context.LoginDetails.FindAsync(id);

            if (loginDetails == null)
            {
                return NotFound();
            }

            return loginDetails;
        }

        // PUT: api/Login/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoginDetails(int id, LoginDetails loginDetails)
        {
            if (id != loginDetails.id)
            {
                return BadRequest();
            }

            _context.Entry(loginDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Login
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LoginDetails>> PostLoginDetails(LoginDetails loginDetails)
        {
            //_context.LoginDetails.Add(loginDetails);
            //await _context.SaveChangesAsync();
            var loginDetailsData =  _context.LoginDetails.Where(a=>a.username == loginDetails.username).FirstOrDefault();

            return CreatedAtAction("GetLoginDetails", new { id = loginDetails.id }, loginDetailsData);
        }

        // DELETE: api/Login/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LoginDetails>> DeleteLoginDetails(int id)
        {
            var loginDetails = await _context.LoginDetails.FindAsync(id);
            if (loginDetails == null)
            {
                return NotFound();
            }

            _context.LoginDetails.Remove(loginDetails);
            await _context.SaveChangesAsync();

            return loginDetails;
        }

        private bool LoginDetailsExists(int id)
        {
            return _context.LoginDetails.Any(e => e.id == id);
        }
    }
}
