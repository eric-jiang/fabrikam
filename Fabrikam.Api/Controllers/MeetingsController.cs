using System;
using System.Collections.Generic;
using System.Linq;
using Fabrikam.Api.Authorization;
using Fabrikam.Api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace fabrikam.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MeetingsController : ControllerBase
    {
        private static readonly List<Meeting> Meetings = new List<Meeting>
        {
            new Meeting(new DateTime(2020, 9, 1, 10, 0, 0),
                new DateTime(2020, 9, 1, 10, 0, 0),
                "recruiter@fabrikam.com",
                "candidate1@fabrikam.com"),
            new Meeting(new DateTime(2020, 9, 20, 13, 30, 0),
                new DateTime(2020, 9, 20, 14, 30, 0),
                "recruiter2@fabrikam.com",
                "candidate2@fabrikam.com"),
            new Meeting(new DateTime(2020, 10, 1, 16, 0, 0),
                new DateTime(2020, 10, 1, 17, 0, 0),
                "recruiter2@fabrikam.com",
                "candidate@fabrikam.com"),
        };

        private readonly ILogger<MeetingsController> _logger;

        public MeetingsController(ILogger<MeetingsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Meeting> Get()
        {
            var email = User.Claims.First(c => c.Type == "https://fabrikam.com/email")?.Value;
            var filteredMeetings = Meetings.Where(m => m.Invitee == email || m.Inviter == email);
            return filteredMeetings;
        }

        [HttpPost]
        [Authorize(Policy = Policies.Recruiter)]
        public void Post(Meeting newMeeting)
        {
            Meetings.Add(newMeeting);
        }
    }
}