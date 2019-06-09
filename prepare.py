import os


def get_plates_folder_links(dataset_folder):
    return [os.path.join(dataset_folder, o) for o in os.listdir(dataset_folder) if
            os.path.isdir(os.path.join(dataset_folder, o))]


def get_data_links(dataset_folder):
    plates_folder_links = get_plates_folder_links(dataset_folder)
    plates_data = {}
    for plate_folder in plates_folder_links:
        data_link = os.path.join(plate_folder, 'data')
        if os.path.isfile(data_link):
            plates_data[os.path.basename(plate_folder)] = data_link
    return plates_data


def get_thermodynamics_features(dataset_folder):
    links = get_data_links(dataset_folder)
    plate = links[[*links][0]]
    with open(plate, 'r') as file:
        features = file.readlines()[0].strip().split('\t')
        return features


def get_plate_feature_array(dataset_folder, plate_name, feature):
    links = get_data_links(dataset_folder)
    plate_link = links[plate_name]
    with open(plate_link, 'r') as file:
        features = file.readlines()[0].strip().split('\t')
        feature_column = features.index(feature)
        file.seek(0)
        data = [float(row.strip().split('\t')[feature_column]) for row in file.readlines()[2:]]
    return data


def get_feature_measure(dataset_folder, feature):
    links = get_data_links(dataset_folder)
    plate = links[[*links][0]]
    with open(plate, 'r') as file:
        features = file.readlines()[0].strip().split('\t')
        feature_column = features.index(feature)
        file.seek(0)
        measures = file.readlines()[1].strip().split('\t')
        return measures[feature_column]


def get_feature_on_plates_cycle(dataset_folder, feature, cycle):
    links = get_data_links(dataset_folder)
    plate = links[[*links][0]]
    with open(plate, 'r') as file:
        features = file.readlines()[0].strip().split('\t')
        feature_column = features.index(feature)
    cycle_row = cycle + 1
    result = {}
    for plate in links:
        with open(links[plate], 'r') as file:
            value = file.readlines()[cycle_row].strip().split('\t')[feature_column]
            result[plate] = value
    return result
