using AwamerTask.Models.Entities;
using System.Data.Entity;

namespace AwamerTask.Conext
{
    public class AwamerDBContext :DbContext
    {
        public AwamerDBContext() : base("AwamerDBConnection")
        {
            //Configuration.LazyLoadingEnabled = false;
        }

        public static AwamerDBContext Create()
        {
            return new AwamerDBContext();
        }


        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<Courses> Courses { get; set; }
    }
}