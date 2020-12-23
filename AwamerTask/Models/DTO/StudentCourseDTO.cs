using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AwamerTask.Models.DTO
{
    public class StudentCourseDTO
    {
        public int? StudentId { get; set; }
        public string StudentName { get; set; }
        public int Age { get; set; }
        public int CourseId { get; set; }
        public string CoursreName { get; set; }

    }
}