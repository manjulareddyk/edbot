cd ../../
# Create a new conda environment and activate the environment.
conda create -n mlc-chat
conda activate mlc-chat

# Install Git and Git-LFS, which is used for downloading the model weights
# from Hugging Face.
conda install git git-lfs

# Install the chat CLI app from Conda.
conda install -c mlc-ai -c conda-forge mlc-chat-nightly

# Create a directory, download the model weights from HuggingFace, and download the binary libraries
# from GitHub.
mkdir -p dist
git lfs install
git clone https://huggingface.co/mlc-ai/demo-vicuna-v1-7b-int3 dist/vicuna-v1-7b
git clone https://github.com/mlc-ai/binary-mlc-llm-libs.git dist/lib

conda deactivate

# Enter this line and enjoy chatting with the bot running natively on your machine!
