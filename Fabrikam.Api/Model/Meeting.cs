using System;

namespace Fabrikam.Api.Model
{
    public class Meeting
    {
        public Meeting()
        {
        }
        
        public Meeting(DateTime startTime, DateTime endTime, string inviter, string invitee)
        {
            StartTime = startTime;
            EndTime = endTime;
            Inviter = inviter;
            Invitee = invitee;
        }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        
        public string Inviter { get; set; }
        public string Invitee { get; set; }
    }
}