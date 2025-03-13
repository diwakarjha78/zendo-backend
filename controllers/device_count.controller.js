import Device_count from '../models/device_count.model.js';

export const set_device_count = async (req, res) => {
  try {
    const { device_id, ai_images, furniture_data } = req.body;

    if (!device_id || !ai_images || !furniture_data) {
      return res.status(200).json({
        status_code: 400,
        message: 'Missing required fields',
      });
    }

    let device_count = await Device_count.findOne({ where: { device_id } });
    if (device_count) {
      await Device_count.update({ ai_images, furniture_data }, { where: { device_id } });
      device_count = await Device_count.findOne({ where: { device_id } });
    } else {
      device_count = await Device_count.create({
        device_id,
        ai_images,
        furniture_data,
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: 'Device Count Added Successfully',
      data: device_count,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      message: 'Error while setting device count',
      error: error.message,
    });
  }
};

export const get_device_count = async (req, res) => {
  try {
    const device_count_id = req.params.id;
    const device_count_data = await Device_count.findOne({
      where: { device_id: device_count_id },
    });
    if (!device_count_data) {
      return res.status(200).json({
        status_code: 422,
        message: 'No data found for the given ID ',
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: 'Data retrieved sucessfully',
      data: device_count_data,
    });
  } catch (error) {
    return res.status(200).json({
      status_code: 500,
      error: error.message,
    });
  }
};
