using AwamerTask.Conext;
using AwamerTask.Models.DTO;
using AwamerTask.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AwamerTask.Controllers
{
    public class HomeController : Controller
    {
        private readonly AwamerDBContext _context;
        public HomeController()
        {
            _context = new AwamerDBContext();
        }
        public ActionResult Index()
        {
            ViewBag.courses = new SelectList(_context.Courses, "id", "CourseName");
            return View();
        }
        [HttpGet]
        public JsonResult SelectAll()
        {
            var data = (from stu in _context.Student
                        join course in _context.Courses on
                         stu.CourseID equals course.id
                        select new StudentCourseDTO
                        {
                            StudentId = stu.id,
                            StudentName = stu.Name,
                            Age = stu.Age,
                            CourseId = course.id,
                            CoursreName = course.CourseName
                        }).ToList();

            //var data = _context.Student.Where(a=>a.CourseID == a.courses.id).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public bool Save(StudentCourseDTO data)
        {
            if (data != null)
            {
                if (data.StudentId != null)
                {
                    //update
                    var exis = _context.Student.Where(x => x.id == data.StudentId).FirstOrDefault();
                    if (exis != null)
                    {
                        exis.Name = data.StudentName;
                        exis.Age = data.Age;
                        exis.CourseID = data.CourseId;
                        _context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    //insert
                    Student stu = new Student();
                    stu.Name = data.StudentName;
                    stu.Age = data.Age;
                    stu.CourseID = data.CourseId;
                    _context.Student.Add(stu);
                    _context.SaveChanges();
                    return true;

                }
            }
            else
            {
                return false;
            }
        }

        public bool Delete(int? id)
        {
            if (id != null)
            {
                var exis = _context.Student.Where(x => x.id == id).FirstOrDefault();
                if (exis != null)
                {
                    _context.Student.Remove(exis);
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}