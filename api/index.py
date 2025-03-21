from flask import Flask, render_template, request, jsonify
import itertools

app = Flask(__name__)

def compute_relations(sets, relation_type):
    elements = sets[0]
    cartesian = [(x, y) for x in elements for y in elements]
    relations = []

    if relation_type == "void":
        relations = []
    elif relation_type == "identity":
        relations = [(x, x) for x in elements]
    elif relation_type == "universal":
        relations = cartesian
    elif relation_type == "reflexive":
        relations = [(x, x) for x in elements]
    elif relation_type == "symmetric":
        relations = [(x, y) for x, y in cartesian if x <= y]
    elif relation_type == "transitive":
        relations = [(x, y) for x, y in cartesian if x < y]
        identity = set([(x, x) for x in elements])
        is_identity = set(relations).issuperset(identity)
    else:
        is_identity = False

    return {"relations": relations, "is_identity": is_identity if relation_type == "transitive" else False}

definitions = {
    "void": "A relation R in a set A is called an empty or void relation if no element of A is related to any element of A.",
    "universal": "A relation R in a set A is called a universal relation if every element of A is related to each element of A.",
    "identity": "A relation R in a set A is called an identity relation if every element of A is related to itself only.",
    "reflexive": "A relation R in a set A is called a reflexive relation if every element of A is related to itself.",
    "symmetric": "A relation R in a set A is called a symmetric relation if (a, b) ∈ R ⇒ (b, a) ∈ R for all a, b ∈ A.",
    "transitive": "A relation R in a set A is called a transitive relation if (a,b) not ∈ R & (b,c) ∈ R ⇒ (a,c) ∈ R"}

def get_notes(relation_type):
    notes = {
        "identity": ["Every identity relation is symmetric.", "Every identity relation is reflexive."],
        "reflexive": ["Every reflexive relation is not symmetric.", "Every identity relation is reflexive."],
        "symmetric": ["Every symmetric relation is not an identity relation.", "Symmetric relations may or may not be reflexive."],
        "transitive": ["Transitive relations may not be symmetric or reflexive."],
        "universal": ["Every universal relation is reflexive and symmetric.", "Universal relations are transitive."],
        "void": ["Void relations are symmetric and transitive but not reflexive."]
    }
    return notes.get(relation_type, [])

def all_possible_relations(sets):
    elements = sets[0]
    cartesian = [(x, y) for x in elements for y in elements]
    subsets = [list(subset) for subset in itertools.chain.from_iterable(itertools.combinations(cartesian, r) for r in range(len(cartesian) + 1))]
    unique_subsets = list({frozenset(subset) for subset in subsets})
    return [list(subset) for subset in unique_subsets]

def cartesian_product(sets):
    return list(itertools.product(*sets))

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        num_sets = int(request.form["num_sets"])
        sets = [request.form[f"set_{i}"].split(",") for i in range(num_sets)]
        relation_type = request.form["relation_type"]

        results = {}
        if relation_type == "all":
            rel_types = ["void", "identity", "universal", "reflexive", "symmetric", "transitive"]
            results["relations"] = {rtype: compute_relations(sets, rtype) for rtype in rel_types}
            results["definitions"] = {rtype: definitions[rtype] for rtype in rel_types}
            results["notes"] = {rtype: get_notes(rtype) for rtype in rel_types}
        else:
            result = compute_relations(sets, relation_type)
            results["relations"] = {relation_type: result}
            results["definitions"] = {relation_type: definitions[relation_type]}
            results["notes"] = {relation_type: get_notes(relation_type)}

        results["possible_relations"] = all_possible_relations(sets)
        results["cartesian"] = cartesian_product(sets)
        results["cartesian_count"] = len(results["cartesian"])
        results["num_elements"] = len(sets[0])
        results["set_labels"] = [chr(65 + i) for i in range(num_sets)]
        results["num_sets"] = num_sets

        return jsonify(results)
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
