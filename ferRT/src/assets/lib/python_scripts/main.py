from fastai import *
from fastai.vision import *
import sys


def main():
    learn = load_learner('zip')
    pred_class = learn.predict(Image(pil2tensor(sys.argv[0], np.float32).div_(255)))[0]
    print(pred_class)
    sys.stdout.flush()


if __name__ == '__main__':
    main()
