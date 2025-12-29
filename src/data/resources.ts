import type { Resource } from '@/types';

export const RESOURCES: Resource[] = [
  // GenAI Resources
  { id: 'genai-1', title: 'Attention Is All You Need (Paper)', url: 'https://arxiv.org/abs/1706.03762', description: 'Original Transformer paper', subject: 'genai', type: 'article' },
  { id: 'genai-2', title: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', description: 'Visual guide to transformers by Jay Alammar', subject: 'genai', type: 'article' },
  { id: 'genai-3', title: 'HuggingFace NLP Course', url: 'https://huggingface.co/course', description: 'Free comprehensive NLP course', subject: 'genai', type: 'course' },
  { id: 'genai-4', title: "Andrej Karpathy: Let's Build GPT", url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', description: 'Build GPT from scratch', subject: 'genai', type: 'video' },
  { id: 'genai-5', title: 'LangChain Documentation', url: 'https://python.langchain.com/', description: 'LangChain for building LLM apps', subject: 'genai', type: 'documentation' },
  { id: 'genai-6', title: 'The Illustrated BERT', url: 'https://jalammar.github.io/illustrated-bert/', description: 'Visual guide to BERT', subject: 'genai', type: 'article' },

  // MLOps Resources
  { id: 'mlops-1', title: 'Made With ML', url: 'https://madewithml.com/', description: 'End-to-end ML + MLOps course', subject: 'mlops', type: 'course' },
  { id: 'mlops-2', title: 'MLOps Zoomcamp', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', description: 'Free MLOps course by DataTalks', subject: 'mlops', type: 'course' },
  { id: 'mlops-3', title: 'DVC Documentation', url: 'https://dvc.org/doc', description: 'Data Version Control docs', subject: 'mlops', type: 'documentation' },
  { id: 'mlops-4', title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html', description: 'Experiment tracking & model registry', subject: 'mlops', type: 'documentation' },
  { id: 'mlops-5', title: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', description: 'Build APIs with FastAPI', subject: 'mlops', type: 'documentation' },
  { id: 'mlops-6', title: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/', description: 'Docker fundamentals', subject: 'mlops', type: 'documentation' },

  // DSA Resources
  { id: 'dsa-1', title: 'NeetCode 150', url: 'https://neetcode.io/practice', description: 'Curated 150 LeetCode problems', subject: 'dsa', type: 'practice' },
  { id: 'dsa-2', title: 'NeetCode YouTube', url: 'https://www.youtube.com/@NeetCode', description: 'Video explanations for problems', subject: 'dsa', type: 'video' },
  { id: 'dsa-3', title: 'Blind 75', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions', description: 'Must-do 75 problems', subject: 'dsa', type: 'practice' },
  { id: 'dsa-4', title: 'LeetCode Patterns', url: 'https://seanprashad.com/leetcode-patterns/', description: 'Problem patterns guide', subject: 'dsa', type: 'article' },
  { id: 'dsa-5', title: 'Striver A2Z DSA Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', description: 'Comprehensive DSA sheet', subject: 'dsa', type: 'practice' },

  // Python Resources
  { id: 'python-1', title: 'CS50P - Python', url: 'https://cs50.harvard.edu/python/', description: 'Harvard CS50 Python course', subject: 'python', type: 'course' },
  { id: 'python-2', title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', description: 'Official Python documentation', subject: 'python', type: 'documentation' },
  { id: 'python-3', title: 'Real Python', url: 'https://realpython.com/', description: 'Python tutorials and articles', subject: 'python', type: 'article' },
  { id: 'python-4', title: 'NumPy Documentation', url: 'https://numpy.org/doc/', description: 'NumPy official docs', subject: 'python', type: 'documentation' },
  { id: 'python-5', title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/', description: 'Pandas official docs', subject: 'python', type: 'documentation' },
  { id: 'python-6', title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', description: 'Free Python book', subject: 'python', type: 'article' },

  // ML/DL Resources
  { id: 'mldl-1', title: 'Andrew Ng ML Course', url: 'https://www.coursera.org/learn/machine-learning', description: 'Classic ML course by Andrew Ng', subject: 'mldl', type: 'course' },
  { id: 'mldl-2', title: '3Blue1Brown Neural Networks', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', description: 'Visual neural network explanations', subject: 'mldl', type: 'video' },
  { id: 'mldl-3', title: 'StatQuest ML Playlist', url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF', description: 'ML concepts explained simply', subject: 'mldl', type: 'video' },
  { id: 'mldl-4', title: 'Fast.ai Practical DL', url: 'https://course.fast.ai/', description: 'Practical deep learning course', subject: 'mldl', type: 'course' },
  { id: 'mldl-5', title: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials', description: 'Official TensorFlow tutorials', subject: 'mldl', type: 'documentation' },
  { id: 'mldl-6', title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/stable/', description: 'Sklearn official docs', subject: 'mldl', type: 'documentation' },
];
