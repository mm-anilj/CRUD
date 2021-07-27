using Microsoft.EntityFrameworkCore;
using Project1.Models;

namespace CodeFirstMigration.Context
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<LoginDetails> LoginDetails { get; set; }
    }
}