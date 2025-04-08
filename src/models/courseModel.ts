import { Schema, model } from "dynamoose";

const commentSchema = new Schema({
  commentId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const lessonSchema = new Schema({
  lessonId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Text", "Quiz","Video"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    schema: [commentSchema],
  },
  video: {
    type: String,
  },
});

const courseSchema = new Schema(
  {
    courseId: {
      type: String,
      hashKey: true,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Draft", "Published"],
    },
    lessons: {
      type: Array,
      schema: [lessonSchema],
    },
    enrollments: {
      type: Array,
      schema: [
        new Schema({
          userId: {
            type: String,
            required: true,
          },
        }),
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);
export default Course;
