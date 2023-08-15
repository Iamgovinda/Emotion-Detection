from channels.generic.websocket import AsyncWebsocketConsumer

from emotion_detector.detector.main2 import emotion_detector


class VideoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        # Process the received frame
        # You can access the frame data in the `text_data` argument
        if len(text_data) >= 100:
            label = emotion_detector(text_data)
            print(label)
            if not label:
                label = "Neutral"
            await self.send(text_data=label)
