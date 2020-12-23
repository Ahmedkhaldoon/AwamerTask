using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AwamerTask.Models.Entities
{
    public class Student
    {

        public int id { get; set; }
        [ForeignKey("CourseID")]
        public Courses courses { get; set; }
        public int CourseID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }

    }
}