以下是以表格形式整理的AI技术基础知识及核心名词解释，涵盖基础概念、学习范式、模型类型、关键术语等维度。

| 类别 | 术语 | 英文 | 简要解释 |
|------|------|------|----------|
| **基础概念** | 人工智能 | Artificial Intelligence (AI) | 让机器模拟人类智能（如学习、推理、感知）的学科。 |
| | 机器学习 | Machine Learning (ML) | AI的子集，让机器从数据中自动学习规律，而非通过硬编码规则。 |
| | 深度学习 | Deep Learning (DL) | 基于多层神经网络的一种机器学习方法，擅长处理图像、语音等复杂数据。 |
| | 弱人工智能 | Narrow AI | 专注于特定任务（如人脸识别、下棋），目前所有商用AI都属于此类。 |
| | 强人工智能 | General AI (AGI) | 具备与人类同等水平的通用智能，能完成任何智力任务，目前尚未实现。 |
| **学习范式** | 监督学习 | Supervised Learning | 使用带标签的数据训练模型（输入→输出对应），如分类、回归。 |
| | 无监督学习 | Unsupervised Learning | 使用无标签数据，让模型自行发现结构（如聚类、降维）。 |
| | 强化学习 | Reinforcement Learning (RL) | 智能体通过与环境互动、试错并获取奖励来学习最优策略。 |
| | 半监督学习 | Semi-supervised Learning | 结合少量标签数据和大量无标签数据进行训练。 |
| | 自监督学习 | Self-supervised Learning | 从数据自身构造标签（如预测句子中遮罩的词），近年大模型的核心方法。 |
| **模型与架构** | 神经网络 | Neural Network | 模拟生物神经元连接的计算模型，由输入层、隐藏层、输出层组成。 |
| | 深度神经网络 | Deep Neural Network (DNN) | 具有多个隐藏层的神经网络，深度学习的基础。 |
| | 卷积神经网络 | Convolutional Neural Network (CNN) | 擅长提取局部空间特征，主要应用于图像、视频处理。 |
| | 循环神经网络 | Recurrent Neural Network (RNN) | 具有循环连接，适合处理序列数据（如文本、时间序列）。 |
| | 长短期记忆网络 | Long Short-Term Memory (LSTM) | 一种特殊的RNN，解决长序列中的梯度消失问题。 |
| | 注意力机制 | Attention Mechanism | 让模型动态聚焦关键信息，Transformer的核心组件。 |
| | Transformer | Transformer | 完全基于自注意力的架构，抛弃RNN，成为大语言模型的基础。 |
| **关键术语** | 训练 / 推理 | Training / Inference | 训练：用数据更新模型参数的过程；推理：用训练好的模型对新样本做预测。 |
| | 特征 | Feature | 用于预测的输入变量（如房价预测中的面积、房间数）。 |
| | 标签 | Label | 监督学习中的目标输出（即要预测的真实值）。 |
| | 损失函数 | Loss Function | 衡量模型预测与真实值之间差距的函数，训练的目标是最小化损失。 |
| | 优化器 | Optimizer | 根据损失函数梯度更新模型参数的算法（如SGD、Adam）。 |
| | 过拟合 / 欠拟合 | Overfitting / Underfitting | 过拟合：模型过度学习训练集细节，对新数据泛化差；欠拟合：连训练集规律都没学好。 |
| | 正则化 | Regularization | 防止过拟合的技术，如L1/L2正则化、Dropout、早停法。 |
| | 激活函数 | Activation Function | 为神经网络引入非线性，如ReLU、Sigmoid、Tanh。 |
| | 反向传播 | Backpropagation | 计算损失函数对各层参数梯度的算法，用于更新权重。 |
| | 学习率 | Learning Rate | 优化器更新参数的步长，影响收敛速度和效果。 |
| | 批大小 / 轮次 | Batch Size / Epoch | 批大小：一次前向传播所用的样本数；轮次：完整遍历整个训练集的次数。 |
| **生成式AI** | 生成对抗网络 | Generative Adversarial Network (GAN) | 包含生成器与判别器两者对抗训练，能生成逼真的图像、音频。 |
| | 变分自编码器 | Variational Autoencoder (VAE) | 学习潜在空间分布并从中采样以生成新数据。 |
| | 大语言模型 | Large Language Model (LLM) | 基于海量文本训练的巨型Transformer模型，如GPT、LLaMA、文心一言。 |
| | 扩散模型 | Diffusion Model | 通过逐步加噪再逆转去噪生成高质量图像（如DALL·E、Stable Diffusion）。 |
| | 提示学习 | Prompt Learning | 设计合适的输入提示来引导大模型完成特定任务，不需微调参数。 |
| **数据与工程** | 训练集 / 验证集 / 测试集 | Train / Validation / Test Set | 训练集用于拟合参数，验证集用于调参和选模型，测试集用于最终评估泛化能力。 |
| | 数据增强 | Data Augmentation | 对原始数据进行变换（如旋转、裁剪图像）以增加训练样本多样性。 |
| | 嵌入 | Embedding | 将离散变量（如单词、商品ID）映射为连续低维向量，表达语义关系。 |
| | 归一化 / 标准化 | Normalization / Standardization | 将数据缩放到相似范围，以加速训练收敛。 |
| | 端到端学习 | End-to-End Learning | 直接从原始输入到最终输出的整体优化，无需分模块处理。 |
| **评估指标** | 准确率 | Accuracy | 分类正确的样本数 / 总样本数。 |
| | 精确率 / 召回率 / F1分数 | Precision / Recall / F1-Score | 精确率：预测为正类中实际为正的比例；召回率：实际正类中被预测出的比例；F1：两者的调和平均。 |
| | 混淆矩阵 | Confusion Matrix | 展示真实类别与预测类别对应关系的表格（TP、FN、FP、TN）。 |
| | ROC曲线 / AUC | ROC Curve / AUC | 衡量二分类模型在不同阈值下性能的综合指标，AUC越接近1越好。 |
| **前沿与伦理** | 可解释性AI | Explainable AI (XAI) | 试图解释“黑箱”模型做出某个决策的原因。 |
| | 联邦学习 | Federated Learning | 在不集中交换原始数据的前提下，多方协同训练模型，保护隐私。 |
| | 对齐 | AI Alignment | 确保AI系统的目标与人类价值观和意图保持一致。 |
| | 幻觉 | Hallucination | 大模型生成看似合理但不符合事实或输入的虚构内容。 |
