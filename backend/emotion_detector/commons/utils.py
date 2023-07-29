def get_file_type(file):
    ext = file.split('.')[1]
    if ext in ['pdf']:
        return 'PDF'
    if ext in ['docx', 'doc', 'txt']:
        return 'DOCUMENT'
    if ext in ['xlsx', 'xls']:
        return 'EXCEL'
    if ext in ['csv']:
        return 'CSV'
    if ext in ['jpg', 'png', 'jpeg', 'svg']:
        return 'IMAGE'
    return None