from flask import Flask, render_template
from flask_socketio import SocketIO, emit, disconnect
from flask_cors import CORS

from load_model import ChairCouchModel

    
def create_app():
# Flask 객체 인스턴스 생성
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY']='sdk'
    socket = SocketIO(app)
    model = ChairCouchModel()

    @app.route('/')
    def index():
        return 'Hello world'

    @socket.on('connect')
    def connect_socket():
        print('user connected')

    @socket.on('classification')
    def model(coords):
        seq_results = []
        
        # 60 frame 
        if len(coords) == 30:
            seq_results = model.predict(coords)
        else:
            for frame_no in range(0, len(coords)-30, 4):
                seq_results += model.predict(coords[frame_no: frame_no + 30])
        result = seq_results[-1]
        emit("answer", result)
        
    @socket.on('disconnect')
    def disconnect_socket():
        disconnect()
        
    return app

if __name__=="__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000)

