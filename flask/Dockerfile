FROM flask-base-image

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install --default-timeout=1000 --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 4000

CMD [ "python3", "app.py" ]