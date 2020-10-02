using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Fabrikam.Api.Authorization
{
    public static class Policies
    {
        public const string Recruiter = "Recruiter";
        private const string RoleClaimType = "http://fabrikam.com/roles";
        
        public static readonly Action<AuthorizationPolicyBuilder> RecruiterPolicy = policy =>
            policy.RequireAssertion(context => HasExpectedRole(context.User.Claims, Recruiter));

        private static bool HasExpectedRole(IEnumerable<Claim> claims, string expectedScope)
        { 
            var role = claims
                .First(claim => string.Equals(claim.Type, RoleClaimType, StringComparison.InvariantCultureIgnoreCase))?
                .Value;
        
            return string.Equals(role, expectedScope, StringComparison.InvariantCultureIgnoreCase);
        }
    }

    }
