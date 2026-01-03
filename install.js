module.exports = {
  run: [
    // Clone the DiffRhythm2 repository
    {
      method: "shell.run",
      params: {
        message: "git clone https://huggingface.co/spaces/ASLP-lab/DiffRhythm2 app"
      }
    },
    // Install all dependencies from requirements.txt first
    {
      method: "shell.run",
      params: {
        venv: "app/env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install gradio==4.44.0",
          "uv pip install spaces",
        ]
      }
    },
    // Install torch with CUDA support at the end (includes xformers and triton)
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "app/env",
          path: "app",
          xformers: true,
          triton: true
        }
      }
    }
  ]
}