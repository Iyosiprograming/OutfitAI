import mongoose from "mongoose"

const closetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    clothes: [
      {
        type: {
          type: String,
          enum: [
            "shoe",
            "top",
            "pant",
            "hat",
            "shade",
            "watch",
            "bag",
            "socks",
            "underwear",
            "scarf"
          ],
          required: true
        },
        name: {
          type: String,
          required: true

        },
        color: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1
        },
        image: {
          type: String,
          required: true  // URL or file path
        }
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model("Closet", closetSchema)
