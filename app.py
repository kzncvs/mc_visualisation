from flask import Flask, render_template, request
from prepare import *
import os

DATASET_FOLDER = '/home/sergo/mc_visualisation/dataset'

app = Flask(__name__)


@app.route('/', methods=['GET'])
def get_request():
    info = open(os.path.join(DATASET_FOLDER, 'info'), 'r').read()
    plates = [*get_data_links(DATASET_FOLDER)]
    plates.sort()
    features = get_thermodynamics_features(DATASET_FOLDER)[1:]

    all_args = request.args.lists()
    all_args = dict(all_args)

    if 't_feature' in all_args:
        current_feature = all_args['t_feature'][0]
    else:
        current_feature = features[1]

    if 'plate' in all_args:
        current_plate = all_args['plate'][0]
    else:
        current_plate = plates[0]

    feature_measure = get_feature_measure(DATASET_FOLDER, current_feature)
    line = get_plate_feature_array(DATASET_FOLDER, current_plate, current_feature)
    x_axis = list(range(1, len(line) + 1))

    max_cycle = len(line)

    if 'cycle' in all_args:
        current_cycle = int(all_args['cycle'][0])
    else:
        current_cycle = max_cycle

    if 'c_feature' in all_args:
        current_c_feature = all_args['c_feature'][0]
    else:
        current_c_feature = features[1]

    graph_2_data = get_feature_on_plates_cycle(DATASET_FOLDER, current_c_feature, current_cycle)
    graph_2_legend = [*graph_2_data]
    graph_2_legend.sort()
    line2 = [float(graph_2_data[i]) for i in graph_2_legend]
    legend = [int(i.split('-')[-1]) for i in graph_2_legend]
    feature2_measure = get_feature_measure(DATASET_FOLDER, current_c_feature)

    return render_template('start.html', info=info.replace('\n', '<br>'), data=plates, features=features,
                           current_feature=current_feature, current_plate=current_plate, line=line,
                           feature_measure=feature_measure, x_axis=str(x_axis), max_cycle=max_cycle,
                           current_cycle=current_cycle, graph_2_legend=legend, line2=line2,
                           feature2_measure=feature2_measure, current_c_feature=current_c_feature)


if __name__ == '__main__':
    app.run(debug=True, host='plot.kazancev.xyz', port='8888')
