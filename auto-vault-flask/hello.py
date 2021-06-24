from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pandas as pd
from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# total_rate = []


# def analyzer(review, word, rate):
#     if(review.find(word) != -1):
#         total_rate.append(rate)


# def display():
#     rate = "{:.1f}".format(sum(total_rate)/len(total_rate))
#     # print("Review: ", review, "\nRate: ", rate)
#     total_rate.clear()
#     return rate


# class HelloWorld(Resource):
#     def get(self, review):
#         analyzer(review, "fault", 1)
#         analyzer(review, "poor", 1)
#         analyzer(review, "Very poor", 0.5)
#         analyzer(review, "very poor", 0.5)
#         analyzer(review, "not reliable", 0.5)
#         analyzer(review, "more reliable", 4)
#         analyzer(review, "reliable", 3.5)
#         analyzer(review, "not comfortable", 1)
#         analyzer(review, "comfortable", 4)
#         analyzer(review, "bad", 1)
#         analyzer(review, "Bad", 1)
#         analyzer(review, "fine", 2)
#         analyzer(review, "just okay", 2)
#         analyzer(review, "not good", 1)
#         analyzer(review, "good", 3)
#         analyzer(review, "Good", 3)
#         analyzer(review, "best", 5)
#         analyzer(review, "Best", 5)
#         analyzer(review, "amazing", 5)
#         analyzer(review, "Great", 5)
#         analyzer(review, "great", 5)
#         analyzer(review, "KING", 5)
#         analyzer(review, "king", 5)
#         analyzer(review, "Excellent", 5)
#         analyzer(review, "excellent", 5)
#         analyzer(review, "not up to the mark", 1)
#         analyzer(review, "not perfect", 1)
#         analyzer(review, "perfect", 4)
#         rate = display()
#         return {
#             "Review": review,
#             "Rating": rate
#         }

#     def post(self):
#         return {"data": "posted!!!"}


# api.add_resource(HelloWorld, "/<string:review>")

# if __name__ == "__main__":
#     app.run(debug=True)


sid = SentimentIntensityAnalyzer()
# sid.polarity_scores('this is excellent')


# class HelloWorld(Resource):
#     def get(self, review):


df = pd.read_csv("data.csv", encoding='latin1')
df['Scores'] = df['Reviews'].apply(lambda review: sid.polarity_scores(review))
df['Compound Scores'] = df['Scores'].apply(lambda d: d['compound'])
# print(df['Name'])
# print(df['Compound Scores'])
i = 0
global output
output = []
length = len(df)
while(i < length):
    neg = df['Scores'][i]['neg']
    neu = df['Scores'][i]['neu']
    pos = df['Scores'][i]['pos']
    result = max(neg, neu, pos)
    if(result == neg):
        output.append({"name": df['Name'][i], "Result": "Negative"})
    elif(result == neu):
        output.append({"name": df['Name'][i], "Result": "Positive"})
    else:
        output.append({"name": df['Name'][i], "Result": "Neutral"})
    print(output)
    print(df['Name'][i], "\t\t", result)
    i += 1


class HelloWorld(Resource):
    def get(self):
        return {"result": output}


api.add_resource(HelloWorld, "/getreviews")

if __name__ == "__main__":
    app.run(debug=True)
# f = open("reviews.txt", "r")
# for x in f:
#     print(x, end=" ")
#     print(sid.polarity_scores(x), end="\n\n")
