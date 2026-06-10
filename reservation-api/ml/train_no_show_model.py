import json
import random
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

random.seed(42)

rows = []

for _ in range(2000):
    no_show_count = random.choices(
        [0, 1, 2, 3, 4, 5],
        weights=[55, 18, 12, 8, 5, 2]
    )[0]

    trust_score = random.randint(0, 100)
    cancelled_reservations = random.randint(0, 10)
    visited_reservations = random.randint(0, 30)

    total_activity = no_show_count + cancelled_reservations + visited_reservations
    is_new_customer = 1 if total_activity < 3 else 0

    risk_score = 0

    risk_score += no_show_count * 20
    risk_score += cancelled_reservations * 5
    risk_score -= min(visited_reservations * 2, 30)

    if trust_score <= 20:
        risk_score += 30
    elif trust_score <= 50:
        risk_score += 15
    elif trust_score >= 80:
        risk_score -= 15

    if is_new_customer:
        risk_score += 8

    if no_show_count == 0 and visited_reservations >= 5:
        risk_score = min(risk_score, 45)

    if no_show_count >= 3:
        risk_score += 20

    probability = max(0, min(100, risk_score))

    no_show_target = 1 if probability >= 50 else 0

    rows.append({
        "trust_score": trust_score,
        "no_show_count": no_show_count,
        "cancelled_reservations": cancelled_reservations,
        "visited_reservations": visited_reservations,
        "is_new_customer": is_new_customer,
        "no_show": no_show_target
    })

df = pd.DataFrame(rows)

features = [
    "trust_score",
    "no_show_count",
    "cancelled_reservations",
    "visited_reservations",
    "is_new_customer"
]

X = df[features]
y = df["no_show"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Random Forest": RandomForestClassifier(
        n_estimators=150,
        max_depth=8,
        random_state=42
    ),
    "Gradient Boosting": GradientBoostingClassifier(
        n_estimators=120,
        learning_rate=0.08,
        max_depth=3,
        random_state=42
    )
}

results = {}
best_model_name = None
best_model = None
best_f1 = -1

for name, model in models.items():
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions, zero_division=0)
    recall = recall_score(y_test, predictions, zero_division=0)
    f1 = f1_score(y_test, predictions, zero_division=0)

    results[name] = {
        "accuracy": round(accuracy, 4),
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1_score": round(f1, 4),
        "classification_report": classification_report(
            y_test,
            predictions,
            output_dict=True,
            zero_division=0
        )
    }

    if f1 > best_f1:
        best_f1 = f1
        best_model_name = name
        best_model = model

bundle = {
    "model": best_model,
    "model_name": best_model_name,
    "features": features
}

joblib.dump(bundle, "no_show_model.pkl")

model_info = {
    "dataset_type": "synthetic prototype dataset",
    "total_rows": len(df),
    "train_rows": len(X_train),
    "test_rows": len(X_test),
    "features": features,
    "target": "no_show",
    "tested_models": results,
    "best_model": best_model_name,
    "selection_metric": "f1_score"
}

with open("model_info.json", "w") as file:
    json.dump(model_info, file, indent=4)

print("Training completed.")
print(f"Best model: {best_model_name}")
print(f"Best F1 score: {round(best_f1, 4)}")
print("Saved: no_show_model.pkl")
print("Saved: model_info.json")