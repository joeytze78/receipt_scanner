<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Receipt Result</title>
    <script type="module" src="./src/display.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-50 text-gray-800">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-6">Receipt OCR Result</h1>

      <div class="grid md:grid-cols-2 gap-10">
        <!-- Left: Captured Image -->
        <div class="flex flex-col items-center">
          <h2 class="text-xl font-semibold mb-4">Captured Image</h2>
          <img
            id="capturedImage"
            alt="Captured receipt will appear here"
            class="w-[350px] aspect-[7/11] object-cover rounded shadow border"
          />
        </div>

        <!-- Right: OCR Result Table -->
        <div>
          <h2 class="text-xl font-semibold mb-4">OCR Fields</h2>
          <form id="ocrForm">
            <div class="space-y-4" id="ocrFields">
              <p class="text-gray-500 text-sm">Processing OCR...</p>
            </div>
          </form>
          <a
            href="index.html"
            class="inline-block mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  </body>
</html>
