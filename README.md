# Fabrikam IAM Solution
This solution consists three main components
- A frontend website in ReactJs, `fabrikam-react`
- A resource api in C#, `Fabrikam.Api`
- An Identity Provider using Auth0 free tier, https://atomy0606.au.auth0.com/.well-known/openid-configuration

# How to run
Both the frontend and backend project need to be up and running.
- Recruiter account:
`Username: recruiter@fabrikam.com; Password: Recruiter@fabrikam.com`
- Candidate account:
`Username: candidate@fabrikam.com; Password: Candidate@fabrikam.com`

#### For frontend `fabrikam-react`
Running on http://localhost:3000
- `cd ./fabrikam-react`
- `npm install`
- `npm start`

#### For backend `Fabrikam.Api`
Running on https://localhost:5001
- `cd ./Fabrikam.Api/`
- `dotnet run`

# Assumptions
- This is solution is a PoC so I didn't include usual development practices, e.g. validation, tests, domain driven design, etc.
- The solution only implements parts that are required for demonstrating IAM concerns. 

# IAM considerations
### Frontend `fabrikam-react`
#### Authentication considerations
- The website is registered with Auth0 as a client application
- It uses OIDC PKCE flow to authenticate user and also request access token for consuming `Fabrikam.API`
- Access token is cached in memory via Auth0 React SDK
- ID token is requested with OpenId, Profile and Email scope
- `/meetings` and `/meetings/schedule` are protected pages

#### Authorization considerations
- `/meetings` is accessible for both recruiters and candidates.
- `/meetings` only displays scheduled meetings of the authenticated user, either as an inviter or invitee
- `/meetings/schedule` is only accessible for recruiters

### Backend `Fabrikam.Api`
#### Authentication considerations
- Making most use of out-of-box .net core 3.1 Identity packages
- All end points are protected
- Token is validated by configured `Issuer` and `Audience`. Signature validation is achieved out of box

#### Authorization considerations
- The api is protected using RBAC given the context of the challenge
- GET `/meetings` filters all scheduled meetings by user's email via custom claim in token
- POST `/meetings` is restricted via "Recruiter" policy
