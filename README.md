# WT1 - OAuth + Consuming REST and GraphQL APIs

In modern web applications, the ability to delegate access between systems is crucial. One widely used standard for access delegation is OAuth (Open Authorization). Although the OAuth flow may appear complex at first, it is important to understand the roles and communication between the different stakeholders (client/consumer/service provider) involved.

# Description

The goal is to develop a three-legged OAuth2 access delegation system for a server-side rendered web application (the consumer) and GitLab (the service provider). The system should enable users to log in to the application using their gitlab.lnu.se account and access the following information from GitLab: basic profile information, the 101 most recent GitLab activities, and information about groups, projects, and the latest commit.

In particular, the system should allow users to view details about the first three projects in each of their first five groups, including information about the latest commit, provided they have access to those groups.

It is important to note that no external packages or modules with built-in OAuth support may be used.

To ensure higher quality and long-term maintainability, the code should be designed and structured in a way that makes it easier to develop, test, and maintain over time.
