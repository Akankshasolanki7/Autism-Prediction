# Model Information

## Random Forest Classifier

### Model Configuration
```python
RandomForestClassifier(
    bootstrap=False,
    max_depth=20,
    n_estimators=50,
    random_state=42
)
```

### Training Details
- **Dataset Size**: 800 samples
- **Features**: 21 input features
- **Target**: Binary classification (ASD/No ASD)
- **Cross-Validation**: 5-fold CV
- **Accuracy**: 93% CV accuracy
- **Data Balancing**: SMOTE oversampling applied

### Feature Set

#### Behavioral Assessment (10 features)
- A1_Score through A10_Score
- Binary responses (0/1) to standardized ASD screening questions

#### Demographic Information (4 features)
- age: Continuous variable
- gender: Binary encoded (Male/Female)
- ethnicity: Multi-class encoded
- contry_of_res: Multi-class encoded

#### Medical History (2 features)
- jaundice: Binary (birth jaundice history)
- austim: Binary (family autism history)

#### Assessment Context (2 features)
- used_app_before: Binary (previous screening app usage)
- relation: Multi-class (relationship to subject)

#### Derived Features (3 features)
- result: Sum of A1-A10 scores
- age_desc: Age category
- ID: Sample identifier (not used in prediction)

### Label Encoders

The following categorical features are encoded using scikit-learn LabelEncoder:

1. **gender**: Male/Female → 0/1
2. **ethnicity**: Multiple ethnic categories → numeric labels
3. **jaundice**: yes/no → 1/0
4. **austim**: yes/no → 1/0
5. **contry_of_res**: Country names → numeric labels
6. **used_app_before**: yes/no → 1/0
7. **relation**: Relationship types → numeric labels

### Model Selection Process

Three algorithms were compared:

| Algorithm | CV Accuracy | Notes |
|-----------|-------------|-------|
| Decision Tree | 86% | Prone to overfitting |
| **Random Forest** | **93%** | **Selected - Best performance** |
| XGBoost | 90% | Good but slightly lower |

### Hyperparameter Tuning

RandomizedSearchCV was used with the following parameter grid:

```python
param_grid_rf = {
    'n_estimators': [50, 100, 200],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'bootstrap': [True, False]
}
```

Best parameters found:
- n_estimators: 50
- max_depth: 20
- bootstrap: False
- Other parameters: default values

### Performance Metrics

**Cross-Validation Results**:
```
Random Forest Cross-Validation Accuracy: 0.92
Best Cross-Validation Accuracy: 0.93
```

**Test Set Performance**:
- Accuracy: 93%
- Suitable for screening applications
- Balanced performance across classes

### Model Files

1. **best_model.pkl**: Serialized Random Forest classifier
2. **encoders.pkl**: Dictionary of LabelEncoder objects
3. **train.csv**: Original training dataset (800 samples, 22 columns)

### Usage Notes

- Model expects exactly 21 features in the specified order
- Categorical features must be encoded using the provided encoders
- Missing values should be handled before prediction
- Model outputs probabilities and binary predictions
- Designed for screening, not diagnostic purposes

### Limitations

- Training data size: 800 samples (relatively small)
- Geographic bias: May not generalize to all populations
- Temporal validity: Model should be retrained with new data
- Screening tool: Not a replacement for professional diagnosis

### Recommendations

- Regular model retraining with updated data
- Performance monitoring in production
- Validation on diverse populations
- Integration with clinical workflows
- Continuous improvement based on feedback
