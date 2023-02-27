# Abstract of Project

The Project leverages mentoring platform, using the power of advanced AI technologies to provide a seamless and effective mentoring experience. With features like Chat GPT 3, Assembly AI, Discord integration, and DigiLocker, our platform offers a comprehensive set of tools to help mentors to achieve their goals.

Using Chat GPT 3, our platform allows mentors to easily create sessions and generate session details with the help of AI.
GPT-3 APIs can generate the session description and title, which will be passed to the needed BAPS.
Assembly AI is then used to generate transcripts and GPT-3 to generate session summaries, providing a complete record of each session. The session summary, transcript, discord invite link, and the recorded video URL are passed to BAPs via status and on_status endpoints, these will be added to fulfilments as tags.

For completed sessions, we create a dedicated Discord channel that includes the transcript and summary of the session. This allows mentors and mentees to continue the conversation and discuss further, building on the insights and knowledge gained from the session.

In addition, our platform integrates with DigiLocker, a secure digital document storage platform, to enable verifiable credentials for mentors. We’ll be mocking the Digilocker `/oauth2/2/xml/eaadhaar` endpoint to the best of our knowledge. These verified credentials can be passed in the creds field of the agent. We are making the platform more trustworthy.

Overall, our platform is a comprehensive mentoring solution that combines the latest AI technologies with innovative features to create a seamless and effective mentoring experience.

## Features

-   Chat GPT 3 integration for user-friendly session creation
-   GPT-3 API for auto-generation of session descriptions
-   Assembly AI for generating session transcripts
-   GPT-3 for generating session summaries using transcripts
-   Auto-created a dedicated Discord channel for completed sessions discussions
-   DigiLocker integration for verifiable credentials
-   Passing verified credentials in the creds field of the agent

## User Workflows

-   A mentor registers to the app.

<img src="https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-1.jpg" width=50% >

<img src="https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-2.jpg" width=50% >

<img src="https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-3.jpg" width=50% >

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-1.jpg)

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-2.jpg)

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-3.jpg)

-   A mentor logs in to the platform and Edits his profile.

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-4-9.jpg)

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-5.jpg)

-   A mentor creates a new mentoring session using Chat GPT 3 AI. The mentor inputs the session title, and start and end date, using these data GPT-3 generates a session description.

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-6.jpg)

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-7.jpg)

-   Once the Session is completed, Assembly AI generates a transcript of the session using the recorded session mp4 file, and GPT-3 generates a summary using the transcript.

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-8.jpg)

-   The session summary along with the discord invite link, transcript, and recording URL is passed on to the BAP in the status /on_status call. The data will be added in the fulfillments as tags

-   After the session is completed, a dedicated Discord channel is created, and the transcript and summary are posted.

![](https://github.com/rakeshSgr/bpp-innovation/blob/develop/Assets/discord.png?raw=true)

-   The mentor and mentee can continue the conversation and discuss further in the dedicated Discord channel, building on the insights and knowledge gained from the session.

-   The mentor can also receive verifiable credentials through DigiLocker integration, increasing their trustworthiness as a mentor. The verified credentials can be passed in the creds field of the agent, further increasing the mentor's credibility on the platform.

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-9.jpg)

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/screen-10.jpg)

## Tech Stack

**Mobile:** Angular + Ionic

**Backend:** Node + Express

**Databases:** Mongo(Storage)

**External:** DigiLocker, Assembly AI, ChatGpt and Discord

**Data Streaming:** Kafka

## Architecture

![](https://raw.githubusercontent.com/rakeshSgr/bpp-innovation/develop/Assets/Architecture.jpg)

## Open-source and Digital Public Goods leveraged/used

-   Mentoring Elevate Platform : https://github.com/ELEVATE-Project

-   BigBlueButton : https://biggerbluebutton.com/
