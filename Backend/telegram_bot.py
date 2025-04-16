import telebot
import requests

# Replace this with your real bot token
BOT_TOKEN = '8006460282:AAGpID4oHk4cpPIxHaf0234bqpnrJh9LplA'
bot = telebot.TeleBot(BOT_TOKEN)

# URL of your Flask API
API_URL = 'http://127.0.0.1:5000/predict'

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "Hi! Send me a news article and I'll tell you if it's Fake or Real.")

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    news_text = message.text
    try:
        response = requests.post(API_URL, json={'text': news_text})
        print("bot is running")
        if response.status_code == 200:
            result = response.json().get('prediction', 'Error')
            bot.reply_to(message, f'🕵️ Prediction: *{result.upper()}*', parse_mode='Markdown')
        else:
            bot.reply_to(message, 'Error contacting prediction server.')
    except Exception as e:
        bot.reply_to(message, f'Error: {str(e)}')

bot.polling()
